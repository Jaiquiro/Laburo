// 📁 mocks/mockServicios.ts

// Modelo de tipo de servicio
export type Servicio = {
  id: string;
  nombre: string;
  descripcion: string;
  contacto: string;
  calificacion: number;
  resena: string;
};

// 🧪 Datos simulados (mock) de servicios
export const mockServicios: Servicio[] = [
  {
    id: '1',
    nombre: 'Maestro Albañil',
    descripcion: 'Construcción y reparación de muros, pisos y estructuras en general.',
    contacto: 'Juan Pérez - 77777777',
    calificacion: 4.8,
    resena: 'Muy responsable y profesional, lo recomiendo totalmente.',
  },
  {
    id: '2',
    nombre: 'Electricista',
    descripcion: 'Instalaciones eléctricas residenciales y mantenimiento preventivo.',
    contacto: 'Lucía Gómez - 71234567',
    calificacion: 4.5,
    resena: 'Trabajo rápido y eficiente.',
  },
  {
    id: '3',
    nombre: 'Plomería',
    descripcion: 'Reparación de tuberías y mantenimiento de instalaciones sanitarias.',
    contacto: 'Carlos Mamani - 76543210',
    calificacion: 4.6,
    resena: 'Eficiente y puntual.',
  },
  {
    id: '4',
    nombre: 'Gasfitería',
    descripcion: 'Instalación de gas domiciliario y mantenimiento.',
    contacto: 'Ana Rivera - 78945612',
    calificacion: 4.3,
    resena: 'Trabajo con mucha precaución y profesionalismo.',
  },
  {
    id: '5',
    nombre: 'Carpintería',
    descripcion: 'Diseño y construcción de muebles a medida.',
    contacto: 'Luis Quispe - 70012345',
    calificacion: 4.7,
    resena: 'Muy detallista, excelente calidad.',
  },
  {
    id: '6',
    nombre: 'Pintor',
    descripcion: 'Pintado interior y exterior de viviendas.',
    contacto: 'Mario Salvatierra - 73311223',
    calificacion: 4.2,
    resena: 'Buen acabado y puntual.',
  },
  {
    id: '7',
    nombre: 'Cerrajero',
    descripcion: 'Apertura de puertas, cambios de cerradura.',
    contacto: 'Jorge Méndez - 70987654',
    calificacion: 4.4,
    resena: 'Muy rápido y profesional.',
  },
  {
    id: '8',
    nombre: 'Jardinero',
    descripcion: 'Mantenimiento de áreas verdes y diseño de jardines.',
    contacto: 'Teresa Choque - 76543218',
    calificacion: 4.9,
    resena: 'Jardín impecable y servicio excelente.',
  },
  {
    id: '9',
    nombre: 'Tecnico en refrigeración',
    descripcion: 'Reparación y mantenimiento de refrigeradores y aires acondicionados.',
    contacto: 'Marco Condori - 70124567',
    calificacion: 4.5,
    resena: 'Rápido diagnóstico y solución efectiva.',
  },
  {
    id: '10',
    nombre: 'Tecnico computadoras',
    descripcion: 'Reparación y mantenimiento de PCs y laptops.',
    contacto: 'Brenda Fernández - 79874563',
    calificacion: 4.6,
    resena: 'Muy buena atención y solución definitiva.',
  },
];
