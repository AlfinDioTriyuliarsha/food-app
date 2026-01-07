export default function CategoryFilter({ categories, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Pilih Kategori</option>
      {categories.map((c) => (
        <option key={c.idCategory} value={c.strCategory}>
          {c.strCategory}
        </option>
      ))}
    </select>
  );
}
