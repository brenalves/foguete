import React from 'react';

import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

import './style.css';

export default function NewProduct() {
    const [categories, setCategories] = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState(null);

    React.useEffect(() => {
        // Fetch categories from the backend (mocked here)
        const fetchCategories = async () => {
            // Replace with actual API call
            const fetchedCategories = [
                { id: 1, name: 'Eletrônicos' },
                { id: 2, name: 'Roupas' },
                { id: 3, name: 'Livros' },
            ];
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    }

    return (
        <div className="admin-new-product">
            <nav>
                <Link to="/admin/dashboard" className="back-link">
                    <FaArrowLeft />
                </Link>

                <h1 className='title'>Novo Produto</h1>
            </nav>
            <main>
                <form className="new-product-form">
                    <div className="fields">
                        <div className="form-group file">
                            <label htmlFor="image">Imagem do Produto</label>
                            <div className="preview">
                                {!previewImage && <span>Pré-visualização da imagem</span>}
                                {previewImage && <img src={previewImage} alt="Preview" />}
                            </div>
                            <input type="file" id="image" name="image" accept="image/*" required onChange={handleImageChange} />
                            {!previewImage && <label htmlFor="image" className='fileLabel'>Enviar imagem</label>}
                            {previewImage && <label htmlFor="image" className='fileLabel delete' onClick={() => setPreviewImage(null)}>Excluir imagem</label>}
                        </div>

                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="name">Nome do Produto</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="code">Código</label>
                                <input type="text" id="code" name="code" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Descrição</label>
                                <textarea id="description" name="description" required></textarea>
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="price">Preço</label>
                                <input type="number" id="price" name="price" step="0.01" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Categoria</label>
                                <select name="category" id="category">
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock">Estoque</label>
                                <input type="number" id="stock" name="stock" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select name="status" id="status">
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <button type="submit" className="submit-button">Criar Produto</button>
                    </div>
                </form>
            </main>
        </div>
    );
}