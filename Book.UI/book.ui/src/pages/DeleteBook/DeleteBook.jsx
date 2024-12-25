const handleDeleteBook = async (bookId) => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        alert('You do not have permission to delete books');
        return;
    }

    try {
        await axios.delete(`http://localhost:5094/api/Books/${bookId}`);
        alert('Book deleted successfully');
        // Kitap listesini yenilemek için gerekli işlemleri yap
    } catch (err) {
        alert('Error deleting book');
    }
};
