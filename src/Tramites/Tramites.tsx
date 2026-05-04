import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./Tramites.css";

export interface ITramitesProps {
  className?: string;
}

export const Tramites = ({
  className,
  ...props
}: ITramitesProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className={"tramites " + (className || "")}>
      <div className="root">
        <img className="background" src="background0.png" />
        <div className="groups">
          <img className="background2" src="background1.png" />
          <div className="background3"></div>
          <div className="background4"></div>
          <div className="background5"></div>
          <div className="background6"></div>
          <div className="groups2">
            <div className="background7"></div>
            <img className="signo-peso-icono-1" src="signo-peso-icono-10.png" />
            <div className="button" onClick={() => navigate("/tramite/tramite-id-1")} style={{cursor:"pointer"}}>
              <div className="background8"></div>
              <img className="image" src="image0.png" />
              <div className="ver-detalles">Ver detalles </div>
            </div>
            <img className="image2" src="image1.png" />
            <img className="background9" src="background8.png" />
            <img className="background10" src="background9.png" />
            <div className="button2">
              <div className="background11"></div>
              <div className="tr-mite-en-i-nea">Trámite en Iínea </div>
              <img className="wifi-icono-1" src="wifi-icono-10.png" />
            </div>
            <div className="direcci-n-de-des">
              Qué departamento de la muni se encarga{" "}
            </div>
            <div className="_0">Costo </div>
            <div className="la-llustre-munic">
              La llustre Municipalidad de Santo Domingo le
              <br /> apoya para acceder a un descuento en la
              <br /> compra de su gas domiciliario Gasco o Lipigas.{" "}
            </div>
            <div className="inscripci-n-desc">
              Inscripción descuento en la
              <br /> compra de gas{" "}
            </div>
            <img className="icono-tramite-2" src="icono-tramite-20.png" />
            <div className="button2">
              <div className="background12"></div>
              <div className="tr-mite-en-i-nea2">Trámite en Iínea </div>
              <img className="wifi-icono-1" src="wifi-icono-11.png" />
            </div>
          </div>
          <div className="groups3">
            <div className="background13"></div>
            <img className="signo-peso-icono-1" src="signo-peso-icono-11.png" />
            <div className="button3" onClick={() => navigate("/tramite/tramite-id-2")} style={{cursor:"pointer"}}>
              <div className="background14"></div>
              <img className="image3" src="image2.png" />
              <div className="ver-detalles2">Ver detalles </div>
            </div>
            <img className="image4" src="image3.png" />
            <img className="background15" src="background14.png" />
            <img className="background16" src="background15.png" />
            <div className="direcci-n-de-des2">
              Qué departamento de la muni se encarga{" "}
            </div>
            <div className="sin-costo">Costo </div>
            <div className="solicita-la-reba">
              Solicita la rebaja o exención total del pago
              <br /> por derechos de aseo municipal según tu
              <br /> calificación socioeconómica.{" "}
            </div>
            <div className="subsidio-al-pago">
              Subsidio al pago del Derecho
              <br /> de Aseo{" "}
            </div>
            <img className="icono-tramite-2" src="icono-tramite-21.png" />
            <div className="button4">
              <div className="background12"></div>
              <div className="tr-mite-en-i-nea2">Trámite en Iínea </div>
              <img className="wifi-icono-1" src="wifi-icono-12.png" />
            </div>
          </div>
          <div className="groups4">
            <div className="background13"></div>
            <div className="button3" onClick={() => navigate("/tramite/tramite-id-3")} style={{cursor:"pointer"}}>
              <div className="background14"></div>
              <img className="image" src="image4.png" />
              <div className="ver-detalles2">Ver detalles </div>
            </div>
            <img className="image4" src="image5.png" />
            <img className="background17" src="background19.png" />
            <div className="background18"></div>
            <img className="background19" src="background21.png" />
            <div className="button5">
              <div className="background12"></div>
              <div className="tr-mite-en-i-nea2">Trámite en Iínea </div>
              <img className="wifi-icono-1" src="wifi-icono-13.png" />
            </div>
            <div className="direcci-n-de-des3">
              Qué departamento de la muni se encarga{" "}
            </div>
            <div className="sin-costo2">Costo </div>
            <div className="obt-n-un-benefic">
              Obtén un beneficio económico para
              <br /> financiar parte del costo de tu boleta de
              <br /> agua potable y alcantarillado.{" "}
            </div>
            <div className="subsidio-de-agua">Subsidio de Agua Potable </div>
            <img className="icono-tramite-1" src="icono-tramite-10.png" />
            <img className="signo-peso-icono-1" src="signo-peso-icono-12.png" />
          </div>
          <div className="background20"></div>
          <div className="background21"></div>
          <div className="groups5">
            <div className="background22"></div>
            <div className="groups6">
              <div className="button6">
                <div className="background23"></div>
                <img className="image5" src="image6.png" />
                <div className="_106-presencial">b presencial </div>
              </div>
              <div className="button7">
                <div className="background24"></div>
                <img className="wifi-icono-12" src="wifi-icono-14.png" />
                <div className="_31-en-l-nea">a en línea </div>
              </div>
              <div className="frame-1321317457"></div>
              <div className="_137-de-137-tr-mi">
                X de Y trámites disponibles{" "}
              </div>
              <div className="mostrando">Mostrando </div>
              <div className="text">
                <div className="background25"></div>
                <img className="image6" src="image7.png" />
                <div className="todas-las-unidad">Todas las unidades </div>
              </div>
              <div className="text2">
                <div className="background26"></div>
                <img className="image7" src="image8.png" />
                <div className="todos-los-tipos">Todos los tipos </div>
              </div>
              <div className="text3">
                <div className="background27"></div>
                <img className="image8" src="image9.png" />
                <div className="buscar-tr-mite-o">
                  Buscar trámite o servicio...{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="button8">
            <div className="background28"></div>
            <div className="_137-tr-mites-dis">X trámites disponibles </div>
          </div>
          <div className="descubre-todos-l">
            Aquí podrá encontrar todos los trámites con los que contamos en la
            municipalidad
            <br />
            Gestiona tus trámites de manera fácil y eficiente.{" "}
          </div>
          <div className="tr-mites-y-servi">Trámites y Servicios </div>
          <div className="groups7">
            <div className="background7"></div>
            <img className="signo-peso-icono-1" src="signo-peso-icono-13.png" />
            <div className="button" onClick={() => navigate("/tramite/tramite-id-1")} style={{cursor:"pointer"}}>
              <div className="background8"></div>
              <img className="image" src="image10.png" />
              <div className="ver-detalles">Ver detalles </div>
            </div>
            <img className="image2" src="image11.png" />
            <div className="image9"></div>
            <img className="background9" src="background34.png" />
            <img className="background10" src="background35.png" />
            <div className="button2">
              <div className="background11"></div>
              <div className="tr-mite-en-i-nea">Trámite en Iínea </div>
              <img className="wifi-icono-1" src="wifi-icono-15.png" />
            </div>
            <div className="direcci-n-de-des">
              Qué departamento de la muni se encarga{" "}
            </div>
            <div className="la-llustre-munic">
              La llustre Municipalidad de Santo Domingo le
              <br /> apoya para acceder a un descuento en la
              <br /> compra de su gas domiciliario Gasco o Lipigas.{" "}
            </div>
            <div className="inscripci-n-desc">
              Inscripción descuento en la
              <br /> compra de gas{" "}
            </div>
            <img className="icono-tramite-2" src="icono-tramite-22.png" />
            <div className="button2">
              <div className="background12"></div>
              <div className="tr-mite-en-i-nea2">Trámite en Iínea </div>
              <img className="wifi-icono-1" src="wifi-icono-16.png" />
            </div>
            <div className="_1">Costo </div>
          </div>
        </div>
        <div className="groups8">
          <div className="tr-mites-y-servi2">
            <span>
              <span className="tr-mites-y-servi-2-span">Usted está en:</span>
              <span className="tr-mites-y-servi-2-span2">
                Trámites y Servicios
              </span>
            </span>{" "}
          </div>
          <img className="image10" src="image13.png" />
        </div>
        <img className="background29" src="background38.png" />
        <div className="groups9">
          <div className="groups10">
            <div className="noticias">Noticias </div>
            <div className="pagos-en-l-nea">Plan regulador comunal </div>
            <div className="pagos-en-l-nea2">SIG </div>
            <div className="pagos-en-l-nea3">Contacto </div>
            <div className="pagos-en-l-nea4">OIRS </div>
            <div className="comuna">Turismo </div>
            <img className="image11" src="image14.png" />
            <img className="image12" src="image15.png" />
            <img className="image13" src="image16.png" />
            <img className="image14" src="image17.png" />
            <div className="municipalidad">Municipio </div>
            <div className="inicio">Trámites y servicios </div>
            <div className="icono-ubicacion-1"></div>
            <img className="icono-ubicacion-2" src="icono-ubicacion-20.png" />
            <img className="icono-mensaje-1" src="icono-mensaje-10.png" />
            <img className="icono-carta-1" src="icono-carta-10.png" />
          </div>
        </div>
        <img className="background30" src="background39.png" />
        <div className="groups11">
          <img className="background31" src="background40.png" />
          <div className="background32"></div>
          <img className="image15" src="image18.png" />
          <div className="text4">
            <img className="background33" src="background42.png" />
            <img className="image16" src="image19.png" />
            <div className="i-te-ayudo-escri">Desea buscar algo...? </div>
            <div className="ley-icono-1"></div>
          </div>
          <div className="_800209090">. . . . . . . . . . . </div>
          <div className="central-telef-ni">Contacto telefónico </div>
          <div className="rancagua">Santo Domingo </div>
          <div className="municipalidad2">Municipalidad </div>
        </div>
        <div className="groups12">
          <div className="ley-del-lobby">Plataforma Ley Lobby </div>
          <img
            className="captura-de-pantalla-2026-04-23-112757-2"
            src="captura-de-pantalla-2026-04-23-112757-20.png"
          />
          <div className="ley-del-lobby2">Solicitud Ley de Transparencia </div>
          <div className="ley-del-lobby3">Transparencia Activa </div>
          <img className="icono-pagina-4" src="icono-pagina-40.png" />
          <div className="ley-del-lobby4">Decretos </div>
          <div className="ley-del-lobby5">
            Observe el Consejo Municipal en VIVO{" "}
          </div>
          <img className="ley-icono-3" src="ley-icono-30.png" />
          <img className="ley-icono-2" src="ley-icono-20.png" />
          <img className="icono-pagina-3" src="icono-pagina-30.png" />
        </div>
        <img className="image17" src="image20.png" />
        <img className="icono-pelicula-1" src="icono-pelicula-10.png" />
      </div>
      <img className="image-5" src="image-50.png" />
    </div>
  );
};