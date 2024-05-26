

// Удаление пользователя
async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/items/${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Пользователь успешно удален');
        } else {
            console.error('Ошибка при удалении пользователя:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
    }
}

// createUser();

// Пример использования:
// createUser()
//     .then(() => updateUser('userIdToUpdate'))
//     .then(() => deleteUser('userIdToDelete'));

// updateUser("D2xch6X4UbH7HJHn", "tester");
// deleteUser('K5rFtWWD4mrLre0D');
// getUsers();