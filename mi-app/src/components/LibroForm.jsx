import { useState } from 'react';

export default function LibroForm({ onSubmit }) {
  const [libro, setLibro] = useState({
    titulo: '',
    fechaPublicacion: '',
    AutorLibro: '3fa85f64-5717-4562-b3fc-2c963f66afa6' // Ejemplo de GUID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibro(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(libro);
    setLibro({
      titulo: '',
      fechaPublicacion: '',
      AutorLibro: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="titulo"
          value={libro.titulo}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha Publicación</label>
        <input
          type="date"
          name="fechaPublicacion"
          value={libro.fechaPublicacion}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
        />
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Crear Libro
      </button>
    </form>
  );
}