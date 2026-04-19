import "./ContactoForm.css";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";



export default function ContactoForm() {
  return (
    <div className="pt-24 sm:pt-32 p-3 sm:h-screen px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-center">
      <div className="max-w-4xl mx-auto bg-[#E6E6ED] rounded-3xl p-6 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="w-12 h-1 bg-lime mb-4"></div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Formulario de Contacto</h1>
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Completa este formulario y da el primer paso hacia una beca deportiva en los EE.UU. ¡Queremos
              conocerte y ayudarte a alcanzar tus metas!
            </p>

            <div className="contact-card p-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Detalles de Contacto.</h2>
              <div className="space-y-2 text-sm">
                <p className="text-gray-900">
                  Número de Teléfono:{" "}
                  <a href="tel:+573223219106" className="font-semibold">
                    +573223219106
                  </a>
                </p>
                <p className="text-gray-900">
                  Dirección de Correo Electrónico:
                  <br />
                  <a href="mailto:Athletic.scholarship.agency@gmail.com" className="font-semibold italic">
                    Athletic.scholarship.agency@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.tiktok.com/@athletic.sa1" target="_blank" className="social-icon">
                <FaTiktok />
              </a>
              <a href="https://www.instagram.com/athletic.sa/" target="_blank" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <input type="text" name="nombre" placeholder="Nombre completo" className="form-input" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="edad" placeholder="Edad" className="form-input" required />
              <input type="tel" name="celular" placeholder="Celular" className="form-input" required />
            </div>

            <div>
              <input type="email" name="email" placeholder="Correo electrónico" className="form-input" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select name="disciplina" className="form-input appearance-none" defaultValue="" required>
                <option value="" disabled>Disciplina</option>
                <option value="futbol">Fútbol</option>
                <option value="baloncesto">Baloncesto</option>
                <option value="atletismo">Atletismo</option>
                <option value="voleibol">Vóleibol</option>
                <option value="tenis">Tenis</option>
                <option value="beisbol">Béisbol</option>
                <option value="natacion">Natación</option>
              </select>

              <select name="tipo_estudiante" className="form-input appearance-none" defaultValue="" required>
                <option value="" disabled>Estudiante</option>
                <option value="secundaria">Secundaria</option>
                <option value="universidad">Universidad</option>
              </select>
            </div>

            <div>
              <input type="text" name="carrera" placeholder="Carrera deseada" className="form-input" required />
            </div>

            <div>
              <textarea name="mensaje" placeholder="Mensaje" className="form-input h-32 resize-none" required />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#c6f723] text-gray-900 px-8 py-3 rounded-bl-[70px] shadow-xl rounded-full font-semibold hover:bg-[#b3e320] transition-colors"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
