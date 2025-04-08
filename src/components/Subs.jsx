import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const SubscriptionInfo = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);

  // Obtener la suscripción del usuario
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) throw new Error('No se encontró token de autenticación.');

        const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/subscription/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          // Si se recibe un 404 se considera que el usuario no tiene suscripción
          if (res.status === 404) {
            setSubscription(null);
          } else {
            const message = await res.text();
            throw new Error(`Error ${res.status}: ${message}`);
          }
        } else {
          const data = await res.json();
          console.log("Suscripción recibida:", data);
          setSubscription(data);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  // Función para crear la sesión de checkout y redireccionar automáticamente al URL recibido
  const handleCheckoutSession = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('No se encontró token de autenticación.');

      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/Payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(`Error ${res.status}: ${message}`);
      }
      const data = await res.json();
      console.log("Checkout session:", data);
      // Redireccionar automáticamente a la URL proporcionada por el endpoint
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <p className="p-4 text-center">Cargando suscripción...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">Error: {error}</p>;

  // Si existe la suscripción, se muestra su información
  if (subscription) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="bg-[#F8F5F2] rounded-2xl p-6 border-2 border-[#E4C9B6] transition-transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-wrap justify-between items-center mb-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-xl font-semibold font-serif">
                Suscripción Activa
              </span>
              <span className="text-[#A2B0CA] text-sm font-sans">
                {subscription.name}
              </span>
            </div>
            <span className="bg-[#C2D2C7] text-[#F8F5F2] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide font-sans">
              {subscription.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-8 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-sm font-serif">Inicio:</span>
              <span className="text-gray-600 text-sm font-sans">
                {format(new Date(subscription.startDate), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-sm font-serif">Fin:</span>
              <span className="text-gray-600 text-sm font-sans">
                {format(new Date(subscription.endDate), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-sm font-serif">Precio:</span>
              <span className="text-[#A26964] text-lg font-serif font-bold">
                ${subscription.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no se encuentra una suscripción, se muestra el mensaje y el botón "Suscríbete"
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-center text-xl">No tienes Suscripción</p>
      {checkoutError && <p className="text-red-500 text-center">{checkoutError}</p>}
      <button
        className="bg-[#C2D2C7] text-[#F8F5F2] px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-[#A2B0CA] transition-colors"
        onClick={handleCheckoutSession}
        disabled={checkoutLoading}
      >
        {checkoutLoading ? 'Procesando...' : 'Suscríbete'}
      </button>
    </div>
  );
};

export default SubscriptionInfo;
