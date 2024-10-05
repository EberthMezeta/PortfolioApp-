document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('tbody');

  tableBody.addEventListener('click', function (event) {
    const button = event.target.closest('.delete-user');
    if (button) {
      const userId = button.getAttribute('data-id');
      confirmDeletion(userId);
    }
  });
});

async function confirmDeletion(userId) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  });

  if (result.isConfirmed) {
    await deleteUser(userId);
  }
}

async function deleteUser(userId) {
  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el usuario.');
    }

    Swal.fire(
      '¡Eliminado!',
      'El usuario ha sido eliminado.',
      'success'
    ).then(() => {
      location.reload();
    });

  } catch (error) {
    console.error('Error:', error);
    Swal.fire(
      'Error',
      error.message || 'No se pudo eliminar el usuario.',
      'error'
    );
  }
}