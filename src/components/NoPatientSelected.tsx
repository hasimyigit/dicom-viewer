
import { Link } from 'react-router-dom'

const NoPatientSelected = () => {
  return (
    <div className="flex justify-center items-center font-semibold w-full h-[calc(100vh-8.3rem)]">
    <p>
      Hasta seçilmemiş, lütfen{" "}
      <Link className="font-extrabold text-blue-600" to={"/"}>
        Anasayfa
      </Link>
      'ya dönüp seçim yapın.
    </p>
  </div>
  )
}

export default NoPatientSelected