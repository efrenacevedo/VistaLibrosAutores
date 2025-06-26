export default function LibroList({ libros, onSelect }) {
  return (
    <div className="space-y-2">
      {libros.length === 0 ? (
        <p>No hay libros disponibles</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {libros.map((libro) => (
            <li 
              key={libro.libreriaMaterialId} 
              className="py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(libro)}
            >
              <div className="font-medium">{libro.titulo}</div>
              <div className="text-sm text-gray-500">
                {new Date(libro.fechaPublicacion).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}