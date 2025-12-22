import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Layout = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        navigate('/'); // Reset URL when category changes
    };
    console.log('tst', selectedCategory);
    return (
    <div className="main">
      <Header selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
      <main className="flex-grow">
        <Outlet context={{ selectedCategory }} />
      </main>
      <Footer setSelectedCategory={handleCategoryChange} />
    </div>
  );
}
export default Layout;