import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AppointmentBooking = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [selectedDate, setSelectedDate] = useState(
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`
  );
  const [time, setTime] = useState('10:00');
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [daysInMonth, setDaysInMonth] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappUpdates: false,
    style: '',
    comments: '',
    tattooImage: null,
    tattooSize: '',
    tattooPlacement: '',
    paymentFile: null,
    termsAccepted: false,
  });

  const daysOfWeek = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const monthsSpanish = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  useEffect(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);

    setDaysInMonth(days);
  }, [month, year]);

  const handleMonthChange = (direction) => {
    let newMonth = direction === 'prev' ? month - 1 : month + 1;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const newDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(newDate);
  };

  const isToday = (day) =>
    day === currentDay && month === currentMonth && year === currentYear;

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.name || !form.email || !form.phone || !form.style) {
      alert('Por favor llena todos los campos obligatorios.');
      return;
    }

    const appointmentData = {
      ...form,
      date: selectedDate,
      time
    };

    console.log('Cita agendada:', appointmentData);
    alert('Cita enviada con éxito 🎉');

    // Aquí podrías enviar los datos a tu backend
    setForm({ name: '', email: '', phone: '', whatsappUpdates: false, style: '', comments: '', tattooImage: null, tattooSize: '', tattooPlacement: '', paymentFile: null, termsAccepted: false });
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img src="/img/banner.jpg" alt="Tattoo Session" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">AGENDA TU CITA</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Calendario */}
        <h2 className="text-xl font-semibold mb-2">Horarios disponibles <span className="text-red-500">*</span></h2>
        <div className="bg-gray-50 rounded-md p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => handleMonthChange('prev')} className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300">Anterior</button>
            <p className="text-sm font-semibold">{`${monthsSpanish[month]} / ${year}`}</p>
            <button onClick={() => handleMonthChange('next')} className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300">Siguiente</button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm mb-2 font-semibold">
            {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {daysInMonth.map((day, index) => {
              const isSelected = day && selectedDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`py-1 rounded-full transition ${
                    day === null ? 'text-transparent' :
                    isSelected ? 'bg-black text-white font-semibold' :
                    isToday(day) ? 'border border-yellow-400 text-black font-semibold' :
                    'text-gray-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-xs text-center text-gray-600">*Tolerancia máx. 10 min una vez comience la cita</p>

          <div className="mt-4 text-center">
            <p className="font-semibold mb-2">{`Seleccionado: ${selectedDate}`}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {['10:00', '12:00', '15:00', '18:00'].map(t => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`px-4 py-2 rounded-md border ${time === t ? 'bg-black text-white' : 'text-gray-700'}`}
                >
                  {t} hrs
                </button>
              ))}
            </div>
            <label className="flex items-center space-x-2 text-sm mt-2">
              <input
                type="checkbox"
                name="termsAccepted"
                onChange={handleInputChange}
                required
              />
              <span>Acepto los términos y condiciones de Nabhi C.</span>
            </label>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-semibold">Nombre completo <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={form.name} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-semibold">Correo electrónico <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={form.email} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-semibold">Teléfono <span className="text-red-500">*</span></label>
            <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" required />
          </div>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              name="whatsappUpdates"
              onChange={handleInputChange}
              checked={form.whatsappUpdates}
            />
            <span>Deseo recibir actualizaciones por Whatsapp</span>
          </label>
          <div>
            <label className="block text-sm font-semibold">Estilo deseado <span className="text-red-500">*</span></label>
            <input type="text" name="style" value={form.style} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" placeholder="Ej: fine line, blackwork..." required />
          </div>
          <div>
            <label className="block text-sm font-semibold">Comentarios o ideas adicionales</label>
            <textarea name="comments" value={form.comments} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" rows="4" placeholder="Describe tu idea, zona del cuerpo, tamaño aproximado, etc." />
          </div>
          <h2 className="text-lg font-bold">Adjuntar imagen <span className="text-red-500">*</span></h2>
          <input
            type="file"
            name="tattooImage"
            accept="image/*"
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <p className="text-sm">Selecciona la(s) imagen(es) del tatuaje o del portafolio.</p>
          <p className="text-red-600 text-sm font-bold">
            Para cotizar un tatuaje, realiza tu consulta a través de Whatsapp.
          </p>
          <input
            type="text"
            name="tattooSize"
            placeholder="E.g. 10 cm x 15 cm"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-red-600">** Si es un tatuaje de portafolio, NO se puede cambiar el tamaño **</p>
          <input
            type="text"
            name="tattooPlacement"
            placeholder="Lugar del tatuaje (e.g. antebrazo, pierna)"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <h2 className="text-lg font-bold">Adjuntar archivo <span className="text-red-500">*</span></h2>
          <input
            type="file"
            name="paymentFile"
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <p className="text-red-600 text-sm font-bold">
            Es necesario realizar un apartado del 50% del costo. Solicita la cuenta a través de Whatsapp.
          </p>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded shadow w-full md:w-auto"
          >
            Agendar cita
          </motion.button>
        </form>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/522211912994?text=Hola%20tengo%20una%20duda"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm transition transform hover:scale-105"
        >
          <img src="/img/whatsapp_icon.png" alt="WhatsApp" className="w-6 h-6" />
          ¿Tienes alguna duda? ¡Contáctanos!
        </a>
      </div>
    </div>
  );
};

export default AppointmentBooking;
