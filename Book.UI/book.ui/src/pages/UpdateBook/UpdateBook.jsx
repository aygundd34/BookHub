const UpdateBook = () => {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
        return <p>You do not have permission to update books.</p>;
    }

    // Kitap güncelleme formu
    return (
        <div>
            <h1>Update Book</h1>
            <form>
                <input type="text" placeholder="Updated Book Title" />
                <input type="text" placeholder="Updated Author" />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
