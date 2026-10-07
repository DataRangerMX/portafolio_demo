/* ==========================================================
   DATOS DEMOSTRATIVOS
   ========================================================== */

const sistemas = {

    SIN: {
        demandaActual: "47,820",
        demandaMaxima: "49,739",
        horaPico: "21:00",
        variacion: "+2.4%",

        datos: [
            31800, 30500, 29600, 29000, 28800, 29500,
            31000, 33500, 36000, 38200, 40100, 41800,
            43000, 43800, 44200, 44700, 45500, 46600,
            47800, 48800, 49739, 49100, 46300, 42800
        ]
    },


    BCA: {
        demandaActual: "2,840",
        demandaMaxima: "3,120",
        horaPico: "18:00",
        variacion: "+1.2%",

        datos: [
            1900, 1840, 1800, 1760, 1740, 1800,
            1950, 2150, 2380, 2550, 2660, 2740,
            2810, 2880, 2920, 2980, 3050, 3120,
            3080, 3010, 2940, 2820, 2600, 2250
        ]
    },


    BCS: {
        demandaActual: "610",
        demandaMaxima: "664",
        horaPico: "17:00",
        variacion: "-0.8%",

        datos: [
            410, 395, 380, 370, 365, 372,
            395, 425, 470, 510, 535, 552,
            570, 590, 610, 635, 655, 664,
            650, 630, 605, 570, 520, 465
        ]
    }

};


/* ==========================================================
   HORAS
   ========================================================== */

const horas = [];

for (let i = 1; i <= 24; i++) {
    horas.push(i.toString().padStart(2, "0") + ":00");
}


/* ==========================================================
   GRÁFICA
   ========================================================== */

const contexto = document
    .getElementById("energyChart")
    .getContext("2d");


const gradiente = contexto.createLinearGradient(
    0,
    0,
    0,
    350
);

gradiente.addColorStop(
    0,
    "rgba(56, 189, 248, 0.35)"
);

gradiente.addColorStop(
    1,
    "rgba(56, 189, 248, 0)"
);


const grafica = new Chart(contexto, {

    type: "line",

    data: {

        labels: horas,

        datasets: [{

            label: "Demanda",

            data: sistemas.SIN.datos,

            borderColor: "#38bdf8",

            backgroundColor: gradiente,

            borderWidth: 2,

            fill: true,

            tension: 0.4,

            pointRadius: 0,

            pointHoverRadius: 6,

            pointHoverBackgroundColor: "#38bdf8"

        }]

    },


    options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {

            legend: {
                display: false
            },

            tooltip: {

                backgroundColor: "#07111f",

                titleColor: "#94a3b8",

                bodyColor: "#ffffff",

                padding: 12,

                displayColors: false,

                callbacks: {

                    label: function(context) {

                        return (
                            context.parsed.y.toLocaleString() +
                            " MW"
                        );

                    }

                }

            }

        },


        scales: {

            x: {

                grid: {
                    display: false
                },

                ticks: {

                    color: "#64748b",

                    maxTicksLimit: 8,

                    font: {
                        size: 10
                    }

                }

            },


            y: {

                border: {
                    display: false
                },

                grid: {
                    color: "rgba(148,163,184,0.08)"
                },

                ticks: {

                    color: "#64748b",

                    font: {
                        size: 10
                    },

                    callback: function(value) {

                        return value.toLocaleString();

                    }

                }

            }

        }

    }

});


/* ==========================================================
   CAMBIO DE SISTEMA
   ========================================================== */

const botonesSistema =
    document.querySelectorAll(".system-button");


botonesSistema.forEach(function(boton) {

    boton.addEventListener("click", function() {

        botonesSistema.forEach(function(b) {
            b.classList.remove("active");
        });

        boton.classList.add("active");


        const sistema =
            boton.dataset.system;


        const informacion =
            sistemas[sistema];


        document.getElementById(
            "currentDemand"
        ).textContent =
            informacion.demandaActual;


        document.getElementById(
            "maxDemand"
        ).textContent =
            informacion.demandaMaxima;


        document.getElementById(
            "peakHour"
        ).textContent =
            informacion.horaPico;


        const variacion =
            document.getElementById("variation");


        variacion.textContent =
            informacion.variacion;


        if (
            informacion.variacion.startsWith("-")
        ) {

            variacion.style.color =
                "#f87171";

        } else {

            variacion.style.color =
                "#22c55e";

        }


        grafica.data.datasets[0].data =
            informacion.datos;


        grafica.update();

    });

});


/* ==========================================================
   MODO CLARO / OSCURO
   ========================================================== */

const botonTema =
    document.getElementById("themeButton");


botonTema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light-mode"
        );


        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            botonTema.textContent = "🌙";

        } else {

            botonTema.textContent = "☀️";

        }

    }
);
