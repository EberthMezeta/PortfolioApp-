// app/assets/javascripts/resumes.js

document.addEventListener('DOMContentLoaded', function () {
  const createResumeButton = document.getElementById('createResumeButton');
  const errorMessageElement = document.getElementById('error-message');
  const resumeInput = document.getElementById('resume_nombre');

  createResumeButton.addEventListener('click', async function () {
    // Limpia el mensaje de error
    errorMessageElement.classList.add('d-none');
    errorMessageElement.textContent = '';

    // Obtiene el nombre del currículo
    const resumeName = resumeInput.value;

    try {
      // Envía la solicitud usando fetch
      const response = await fetch('/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Incluye el token CSRF
        },
        body: JSON.stringify({ resume: { nombre: resumeName } })
      });

      if (!response.ok) {
        // Si hay un error en la respuesta, lanza un error
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to create resume.');
      }

      // Si la respuesta es exitosa, recarga la página
      location.reload(); // Recarga la página después de crear el currículum

    } catch (error) {
      // Si hay un error, muestra el mensaje en el modal
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = error.message;
    }
  });
  const deleteResumeButtons = document.querySelectorAll('.delete-resume');

  deleteResumeButtons.forEach(button => {
    button.addEventListener('click', async function (event) {
      event.preventDefault(); // Previene el comportamiento por defecto del enlace

      const resumeId = this.dataset.id; // Obtiene el ID del currículum a eliminar
      const confirmDelete = confirm('Are you sure you want to delete this resume?'); // Confirma la acción

      if (confirmDelete) {
        try {
          const response = await fetch(`/resumes/${resumeId}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to delete resume.');
          }

          location.reload(); // Recarga la página después de eliminar el currículum

        } catch (error) {
          alert(error.message); // Muestra un mensaje de error si falla la eliminación
        }
      }
    });
  });
});
