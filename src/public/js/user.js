const socket = io();
console.log(socket)

const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            alert('¡Usuario registrado con éxito!');
            window.location.href = '/login';
        } else {
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error interno del servidor');
    }
});

function addToCart(cid, pid) {
    const data = {
      cid: cid,
      pid: pid
    };
  
    fetch('/addtocart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
  
      // Actualizar la interfaz de usuario según la respuesta del servidor
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Otras funciones relacionadas con el carrito de compras
  
  // Exportar las funciones que quieras utilizar en otros archivos
  export { addToCart, /* otras funciones */ };