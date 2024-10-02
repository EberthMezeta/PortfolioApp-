document.addEventListener('DOMContentLoaded', function () {
  const createProjectButton = document.getElementById('createProjectButton');
  const errorMessageElement = document.getElementById('projectError');
  const titleInput = document.getElementById('projectTitle');
  const descriptionInput = document.getElementById('projectDescription'); // Asumiendo que hay un campo para la descripción
  const urlInput = document.getElementById('projectUrl'); // Asumiendo que hay un campo para la URL
  const resumeId = document.getElementById('resumeId').value; // Asegúrate de tener el ID del resume en el DOM

  createProjectButton.addEventListener('click', async function (event) {

    errorMessageElement.classList.add('d-none');
    errorMessageElement.textContent = '';

    const title = titleInput.value;
    const description = descriptionInput.value;
    const url = urlInput.value;

    try {
      const response = await fetch(`/resumes/${resumeId}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ project: { title: title, description: description, url: url } })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error al agregar el proyecto.');
      }

      location.reload();

    } catch (error) {
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = error.message;
    }
  });
  const deleteProjectButtons = document.querySelectorAll('.delete-project');

  deleteProjectButtons.forEach(button => {
    button.addEventListener('click', async function (event) {
      event.preventDefault(); // Previene el comportamiento por defecto del enlace

      const resumeId = document.getElementById('resumeId').value; // Obtiene el ID del currículum asociado
      const projectId = this.dataset.id; // Obtiene el ID del proyecto a eliminar
      const confirmDelete = confirm('¿Está seguro de que desea eliminar este proyecto?'); // Confirma la acción

      if (confirmDelete) {
        try {
          const response = await fetch(`/resumes/${resumeId}/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Error al eliminar el proyecto.');
          }

          location.reload(); // Recarga la página después de eliminar el proyecto

        } catch (error) {
          alert(error.message); // Muestra un mensaje de error si falla la eliminación
        }
      }
    });
  });

});
