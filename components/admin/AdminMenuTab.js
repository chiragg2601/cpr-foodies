'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'Starters',
  'Indian Mains',
  'Chinese Mains',
  'Continental Mains',
  'Fast Food',
  'Breads & Rice',
  'Desserts',
  'Beverages',
];

const CUISINES = ['Indian', 'Chinese', 'Continental', 'Fast Food', 'Cafe'];

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: 'Starters',
  cuisine: 'Indian',
  image: '',
  isVeg: true,
  isAvailable: true,
  isFeatured: false,
  spicyLevel: 1,
};

export default function AdminMenuTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/menu?showAll=1');
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      cuisine: item.cuisine,
      image: item.image,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured,
      spicyLevel: item.spicyLevel,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingId ? `/api/menu/${editingId}` : '/api/menu';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to save item');
        return;
      }

      toast.success(editingId ? 'Item updated' : 'Item created');
      setShowModal(false);
      fetchItems();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this menu item?')) return;

    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to delete item');
        return;
      }

      toast.success('Item deleted');
      fetchItems();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-semibold">Menu Items ({items.length})</h2>
        <button onClick={openCreate} className="btn-gold !py-2 !px-4 text-sm">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal-400 text-center">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-charcoal-400 text-center">No menu items yet. Add your first item!</p>
      ) : (
        <div className="overflow-x-auto card-charcoal">
          <table className="w-full text-sm">
            <thead className="border-b border-charcoal-700 text-charcoal-400 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Cuisine</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-charcoal-800 last:border-0">
                  <td className="p-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3 text-charcoal-300">{item.category}</td>
                  <td className="p-3 text-charcoal-300">{item.cuisine}</td>
                  <td className="p-3 text-gold-400 font-semibold">₹{item.price}</td>
                  <td className="p-3">
                    {item.isAvailable ? (
                      <span className="text-green-400 text-xs">Available</span>
                    ) : (
                      <span className="text-red-400 text-xs">Hidden</span>
                    )}
                    {item.isFeatured && (
                      <span className="text-gold-400 text-xs block">Featured</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 hover:text-gold-400">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="card-charcoal max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-xl font-semibold">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-charcoal-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="input-dark" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="input-dark" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Price (₹) *</label>
                  <input type="number" name="price" min="0" value={form.price} onChange={handleChange} className="input-dark" required />
                </div>
                <div>
                  <label className="block text-sm mb-1">Spicy Level (0-3)</label>
                  <input type="number" name="spicyLevel" min="0" max="3" value={form.spicyLevel} onChange={handleChange} className="input-dark" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} className="input-dark">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Cuisine *</label>
                  <select name="cuisine" value={form.cuisine} onChange={handleChange} className="input-dark">
                    {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Image URL</label>
                <input type="text" name="image" value={form.image} onChange={handleChange} className="input-dark" placeholder="https://..." />
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" name="isVeg" checked={form.isVeg} onChange={handleChange} className="accent-gold-500" />
                  Vegetarian
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="accent-gold-500" />
                  Available
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="accent-gold-500" />
                  Featured
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gold flex-1 disabled:opacity-60">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : null}
                  {saving ? 'Saving...' : editingId ? 'Update Item' : 'Create Item'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline-gold flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
