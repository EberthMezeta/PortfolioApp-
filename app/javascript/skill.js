document.addEventListener('DOMContentLoaded', function () {
  const createSkillButton = document.getElementById('createSkillButton');
  const errorMessageElement = document.getElementById('skillError');
  const nameInput = document.getElementById('skillName');
  const typeInput = document.getElementById('skillType'); // Asumiendo que hay un campo para el tipo
  const resumeId = document.getElementById('resumeId').value; // Asegúrate de tener el ID del resume en el DOM


  createSkillButton.addEventListener('click', async function (event) {
    errorMessageElement.classList.add('d-none');
    errorMessageElement.textContent = '';

    const name = nameInput.value;
    const type = typeInput.value;




    try {
      const response = await fetch(`/resumes/${resumeId}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ skill: { name: name, skill_type: type } })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error al agregar la habilidad.');
      }

      location.reload();

    } catch (error) {
      errorMessageElement.classList.remove('d-none');
      errorMessageElement.textContent = error.message;
    }
  });

  const deleteSkills = document.querySelectorAll('.delete-skill');

  deleteSkills.forEach(link => {
    link.addEventListener('click', async function (event) {
      event.preventDefault(); // Previene el comportamiento por defecto del enlace

      const resumeId = document.getElementById('resumeId').value; // Obtiene el ID del currículum asociado
      const skillId = this.dataset.id; // Obtiene el ID de la habilidad
      const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta habilidad?"); // Confirma la acción

      if (confirmDelete) {
        try {
          const response = await fetch(`/resumes/${resumeId}/skills/${skillId}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Error al eliminar la habilidad.');
          }

          this.closest('li').remove(); // Elimina el elemento de la lista

        } catch (error) {
          alert('Error al eliminar la habilidad: ' + error.message); // Muestra el mensaje de error
        }
      }
    });
  });


});
