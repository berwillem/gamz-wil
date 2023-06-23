import "./CategorySide.css";
import arrow from "../../assets/Svg/arrow.svg";
import subcategoryes from "../../Data/subCategory";
import subSubCategoryes from "../../Data/subSubCategory";
import subSubSubCategoryes from "../../Data/subSubSubCategory";
import subSubSubSubCategoryes from "../../Data/subSubSubSubCategory";

function CategorySide({ onSubcategoryChange }) {
  const handleSubcategorySelection = (subcategoryId) => {
    onSubcategoryChange(subcategoryId);
  };

  return (
    <div className="category-side-container">
      <div className="category-side-title">
        <h4>Choisir une catégorie</h4>
      </div>
      <div className="category-side">
        {subcategoryes.map((subcategorye) => {
          const subSubCategories = subSubCategoryes.filter(
            (subSubCategory) =>
              subSubCategory.parentCategoryId === subcategorye.id
          );

          if (subSubCategories.length > 0) {
            return (
              <li key={subcategorye.id}>
                <p onClick={() => handleSubcategorySelection(subcategorye.id)}>
                  {subcategorye.label}
                </p>
                <img src={arrow} alt="arrow" />
                <div className="hover-drop-down">
                  {subSubCategories.map((subSubCategory) => {
                    const subSubSubCategories = subSubSubCategoryes.filter(
                      (subSubSubCategory) =>
                        subSubSubCategory.parentCategoryId === subSubCategory.id
                    );

                    return (
                      <ul key={subSubCategory.id}>
                        <li
                          className="drop-down-titel"
                          onClick={() => handleSubcategorySelection(subSubCategory.id)}
                        >
                          {subSubCategory.label}
                        </li>
                        <div>
                          {subSubSubCategories.map((subSubSubCategory) => {
                            const subSubSubSubCategories =
                              subSubSubSubCategoryes.filter(
                                (subSubSubSubCategory) =>
                                  subSubSubSubCategory.parentCategoryId ===
                                  subSubSubCategory.id
                              );

                            return (
                              <ul key={subSubSubCategory.id}>
                                <li
                                  
                                  onClick={() => handleSubcategorySelection(subSubSubCategory.id)}
                                >
                                  {subSubSubCategory.label}
                                </li>
                                <div>
                                  {subSubSubSubCategories.map((subSubSubSubCategory) => (
                                    <li
                                      key={subSubSubSubCategory.id}
                                      onClick={() => handleSubcategorySelection(subSubSubSubCategory.id)}
                                    >
                                      {subSubSubSubCategory.label}
                                    </li>
                                  ))}
                                </div>
                                
                              </ul>

                            );
                          })}
                        </div>
                     
                      </ul>
                    );
                  })}
                    <img src={subcategorye.src} alt="" className="img-cat" id={subcategorye.label} />
                </div>
              </li>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default CategorySide;
