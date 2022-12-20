import { client } from "../lib/sanity_client"

export default function CategoriesPage(categories) {




    return (
        <div>
            <h1>Browse Categories</h1>
            <div>
                {categories.categories.map((category) => (
                    <div key={category.name}>
                        <h1>{category.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}



export async function getStaticProps() {
    
    const queryCategory = '*[_type == "category"]'
    
    const categories = await client.fetch(queryCategory)
  
    return {
      props: {
        categories
      }
    }
  }