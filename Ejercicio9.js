"use strict";
class Meteo{
    constructor(){
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.tipo = "&mode=xml";
        this.error = "<h2>No se pudo obtener información de <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";
    }
    
    cargarDatos(ciudad, codigoPais){
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        
        $.ajax({
            dataType: "xml",
            url: url,
            method: 'GET',
            success: function(datos){
                $('.xml').text((new XMLSerializer()).serializeToString(datos));

                var icono            = $('weather',datos).attr("icon");    // cuenta los elementos de XML: son los nodos del Arbol DOM de XML
                var totalNodos            = $('*',datos).length; 
                var ciudad                = $('city',datos).attr("name");
                var longitud              = $('coord',datos).attr("lon");
                var latitud               = $('coord',datos).attr("lat");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var minutosZonaHoraria    = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970   = Date.parse(amanecer);
                    amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer             = $('sun',datos).attr("set");          
                var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                    oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var temperaturaUnit       = $('temperature',datos).attr("unit");
                var humedad               = $('humidity',datos).attr("value");
                var humedadUnit           = $('humidity',datos).attr("unit");
                var presion               = $('pressure',datos).attr("value");
                var presionUnit           = $('pressure',datos).attr("unit");
                var velocidadViento       = $('speed',datos).attr("value");
                var nombreViento          = $('speed',datos).attr("name");
                var direccionViento       = $('direction',datos).attr("value");
                var codigoViento          = $('direction',datos).attr("code");
                var nombreDireccionViento = $('direction',datos).attr("name");
                var nubosidad             = $('clouds',datos).attr("value");
                var nombreNubosidad       = $('clouds',datos).attr("name");
                var visibilidad           = $('visibility',datos).attr("value");
                var precipitacionValue    = $('precipitation',datos).attr("value");
                var precipitacionMode     = $('precipitation',datos).attr("mode");
                var descripcion           = $('weather',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                    horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");

                $('.datos').empty();    
                $('.datos').append('<img src="https://openweathermap.org/img/w/' + icono + '.png" alt="img weather">');
                $('.datos').append("<br>Número de elementos de XML: " + totalNodos + "<br>");
                $('.datos').append("Ciudad: " + ciudad + "<br>");
                $('.datos').append("País: " + pais + "<br>");
                $('.datos').append("Latitud: " + latitud + " grados<br>");
                $('.datos').append("Longitud: " + longitud + " grados<br>");
                $('.datos').append("Temperatura: " + temperatura + " grados Celsius<br>");
                $('.datos').append("Temperatura (unidades): " + temperaturaUnit + "<br>");
                $('.datos').append("Máx temperatura: " + temperaturaMax + " grados Celsius<br>");
                $('.datos').append("Min temperatura: " + temperaturaMin + " grados Celsius<br>");
                $('.datos').append("Presión: " + presion +  " " + presionUnit + "<br>");
                $('.datos').append("Humedad: " + humedad + " " + humedadUnit + "<br>"); 
                $('.datos').append("Amanece a las: " + amanecerLocal + "<br>"); 
                $('.datos').append("Oscurece a las: " + oscurecerLocal + "<br>"); 
                $('.datos').append("Nombre del viento: " + nombreViento + "<br>");
                $('.datos').append("Velocidad del viento: " + velocidadViento + "metros/segundo<br>"); 
                $('.datos').append("Dirección del viento: " + direccionViento +"grados<br>");
                $('.datos').append("Nombre del viento: " + nombreDireccionViento + "<br>");
                $('.datos').append("Código viento: " + codigoViento + "<br>");
                $('.datos').append("Visibilidad: " + visibilidad + " metros<br>");
                $('.datos').append("Nubosidad: " + nubosidad + "<br>");
                $('.datos').append("Nombre nubosidad: " + nombreNubosidad + "<br>");
                $('.datos').append("Precipitación valor: " + precipitacionValue + "<br>");
                $('.datos').append("Precipitación modo: " + precipitacionMode + "<br>");
                $('.datos').append("Descripción: " + descripcion + "<br>");
                $('.datos').append("Fecha de la medida: " + fechaMedidaLocal + "<br>");
                $('.datos').append("Hora de la medida: " + horaMedidaLocal);
            },
            error:function(){
                document.write(this.error);    
            }
        });
    }
}

var meteo = new Meteo();