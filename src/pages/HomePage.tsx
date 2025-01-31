import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"

const HomePage = () => {
  return(
    <div className="flex flex-col gapt-12">

        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16"> {/*Margen negativo lleva el elemento hacia arriba */}
            <h1 className="text-5xl font-bold tracking-thigt text-orange-600">
                Tuck into a takeaway today
            </h1>
            <span className="text-xl">Food is just a click away!</span>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingImage} />
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Order takeaway even faster!
                </span>
                <span>
                    Download the MerEats App for faster ordening and personalized recomdations.
                </span>
                <img src={appDownloadImage} />
            </div>
        </div>

    </div>
  )
}

export default HomePage;