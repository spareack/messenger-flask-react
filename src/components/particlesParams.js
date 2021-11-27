const params = { 
    snow: {"particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true
                }
            },
            "size": {
                "value": 10,
                "random": true
            },
            "move": {
                "direction": "none",
                "out_mode": "out",
                "speed": 2,
                "bounce": false
            },
            "line_linked": {
                "enable": false
            }
        },
        "interactivity": {
            "events": {
                "onclick": {
                    "enable": false,
                    "mode": "push"
                }
            }
        }},
        particles: {"particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": false,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 4,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 10,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 100,
              "color": "#fffff1",
              "opacity": 0.2,
              "width": 0.5
            },
            "move": {
              "enable": true,
              "speed": 1,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 126,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 160,
                "size": 6,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 2
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true}
}

export default params;