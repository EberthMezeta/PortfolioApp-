// app/assets/javascripts/resumes.js

// app/assets/javascripts/resumes.js

document.addEventListener('DOMContentLoaded', function () {

  const createResumeButton = document.getElementById('createResumeButton');
  const errorMessageElement = document.getElementById('error-message');
  const resumeInput = document.getElementById('resume_nombre');
  const resumeContainer = document.querySelector('.resume-container');
  const copyToast = new bootstrap.Toast(document.getElementById('copyToast'));

  const fetchWrapper = async (url, options) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error en la solicitud.');
      }
      return response;
    } catch (error) {
      throw error; // Propagar el error para manejarlo más tarde
    }
  };

  const showErrorMessage = (message) => {
    errorMessageElement.classList.remove('d-none');
    errorMessageElement.textContent = message;
  };

  const clearErrorMessage = () => {
    errorMessageElement.classList.add('d-none');
    errorMessageElement.textContent = '';
  };

  const createResume = async () => {
    clearErrorMessage();
    const resumeName = resumeInput.value;

    try {
      await fetchWrapper('/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ resume: { nombre: resumeName } })
      });
      location.reload();
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    const { value: confirmDelete } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    });

    if (confirmDelete) {
      try {
        await fetchWrapper(`/resumes/${resumeId}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          }
        });
        location.reload();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const downloadResume = async (resumeId) => {
    try {
      const response = await fetchWrapper(`/resumes/${resumeId}/download`, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        }
      });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = `resume_${resumeId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
      alert('Hubo un error al intentar descargar el archivo.');
    }
  };

  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      copyToast.show();
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Hubo un error al copiar el enlace.');
    }
  };

  const generateLink = async (resumeId) => {
    try {
      await fetchWrapper(`/resumes/${resumeId}/generate_public_link`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          'Content-Type': 'application/json'
        }
      });
      location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteResumeCommand = async (target) => {
    const resumeId = target.dataset.id;
    await deleteResume(resumeId);
  };

  const downloadResumeCommand = async (target) => {
    const resumeId = target.getAttribute('data-id');
    await downloadResume(resumeId);
  };

  const copyLinkCommand = async (target) => {
    const url = target.getAttribute('data-url');
    await copyLink(url);
  };

  const generateLinkCommand = async (target) => {
    const resumeId = target.dataset.id;
    await generateLink(resumeId);
  };

  const actionMap = {
    'delete-resume': deleteResumeCommand,
    'downloadResume': downloadResumeCommand,
    'copy-link-btn': copyLinkCommand,
    'generate-link': generateLinkCommand,
  };
  // Manejo de eventos
  createResumeButton.addEventListener('click', createResume);

  resumeContainer.addEventListener('click', async function (event) {
    const target = event.target;
    const action = Object.keys(actionMap).find(className => target.classList.contains(className));

    if (action) {
      event.preventDefault();
      await actionMap[action](target);
    }
    // if (target.classList.contains('delete-resume')) {
    //   event.preventDefault();
    //   const resumeId = target.dataset.id;
    //   await deleteResume(resumeId);
    // }

    // if (target.classList.contains('downloadResume')) {
    //   const resumeId = target.getAttribute('data-id');
    //   await downloadResume(resumeId);
    // }

    // if (target.classList.contains('copy-link-btn')) {
    //   const url = target.getAttribute('data-url');
    //   await copyLink(url);
    // }

    // if (target.classList.contains('generate-link')) {
    //   const resumeId = target.dataset.id;
    //   await generateLink(resumeId);
    // }
  });
});
