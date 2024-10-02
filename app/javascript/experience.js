document.addEventListener('DOMContentLoaded', function () {
  const createExperienceButton = document.getElementById('createExperienceButton');
  const errorMessageElement = document.getElementById('experienceError');
  const jobTitleInput = document.getElementById('experienceJobTitle');
  const companyInput = document.getElementById('experienceCompany'); // Asumiendo que hay un campo para la empresa
  const startDateInput = document.getElementById('experienceStartDate'); // Asumiendo que hay un campo para la fecha de inicio
  const endDateInput = document.getElementById('experienceEndDate'); // Asumiendo que hay un campo para la fecha de finalización
  const descriptionInput = document.getElementById('experienceDescription'); // Asumiendo que hay un campo para la descripción
  const resumeId = document.getElementById('resumeId').value; // Asegúrate de tener el ID del resume en el DOM

  createExperienceButton.addEventListener('click', async function (event) {

    errorMessageElement.classList.add('d-none');
    errorMessageElement.textContent = '';

    const jobTitle = jobTitleInput.value;
    const company = companyInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const description = descriptionInput.value;

    try {
      const response = await fetch(`/resumes/${resumeId}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ experience: { job_title: jobTitle, company: company, start_date: startDate, end_date: endDate, description: description } })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error al agregar la experiencia.');
      }

      location.reload();

    } catch (error) {
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = error.message;
    }
  });

  const deleteExperienceButtons = document.querySelectorAll('.delete-experience');

  deleteExperienceButtons.forEach(button => {
    button.addEventListener('click', async function (event) {
      event.preventDefault(); // Previene el comportamiento por defecto del enlace

      const resumeId = document.getElementById('resumeId').value; // Obtiene el ID del currículum asociado
      const experienceId = this.dataset.id; // Obtiene el ID de la experiencia a eliminar
      const confirmDelete = confirm('¿Está seguro de que desea eliminar esta experiencia?'); // Confirma la acción

      if (confirmDelete) {
        try {
          const response = await fetch(`/resumes/${resumeId}/experiences/${experienceId}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Error al eliminar la experiencia.');
          }

          location.reload(); // Recarga la página después de eliminar la experiencia

        } catch (error) {
          alert(error.message); // Muestra un mensaje de error si falla la eliminación
        }
      }
    });
  });

});
