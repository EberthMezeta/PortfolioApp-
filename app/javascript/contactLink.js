
document.addEventListener('DOMContentLoaded', function () {

  const createContactLinkButton = document.getElementById('createContactLinkButton');
  const errorMessageElement = document.getElementById('contactLinkError');
  const contactLinkUrlInput = document.getElementById('contactLinkUrl');
  const platformInput = document.getElementById('contactLinkPlatform'); // Asumiendo que hay un campo para la plataforma
  const resumeId = document.getElementById('resumeId').value; // Asegúrate de tener el ID del resume en el DOM

  createContactLinkButton.addEventListener('click', async function (event) {
    errorMessageElement.classList.add('d-none');
    errorMessageElement.textContent = '';

    const url = contactLinkUrlInput.value;
    const platform = platformInput.value; // Obtener el valor de la plataforma

    try {
      const response = await fetch(`/resumes/${resumeId}/contact_links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ contact_link: { url: url, platform: platform } })
      });


      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error al agregar el enlace de contacto.');
      }

      location.reload();

    } catch (error) {
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = error.message;
    }
  });


  const deleteContactLinks = document.querySelectorAll('.delete-contact-link');

  deleteContactLinks.forEach(link => {
    link.addEventListener('click', async function (event) {
      event.preventDefault(); // Evita la acción por defecto del enlace
      const contactLinkId = this.dataset.id; // Obtiene el ID del enlace de contacto
      const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este enlace de contacto?");

      if (confirmDelete) {
        try {
          const response = await fetch(`/resumes/${resumeId}/contact_links/${contactLinkId}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          });

          if (response.ok) {
            // Elimina el elemento del DOM
            location.reload();
          } else {
            alert('Error al eliminar el enlace de contacto.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Ocurrió un error al intentar eliminar el enlace de contacto.');
        }
      }
    });
  });


});
