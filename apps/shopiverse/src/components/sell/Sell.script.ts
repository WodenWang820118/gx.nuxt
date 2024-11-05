import { Product } from '../utils/product.interface';

const supabase = useSupabaseClient();
const user = useSupabaseUser();

// if (!user.value) await navigateTo('/login');

const productTitle = useState(() => null);
const productDescription = useState(() => null);
const productPrice = useState(() => null);
const productCategory = useState(() => null);
const productImage = useState(() => null);
const imageUrl = useState(() => null);
const imageUploadSuccessMsg = useState(() => null);
const imageUploadErrorMsg = useState(() => null);
const productCreationSuccessMsg = useState(() => null);
const productCreationErrorMsg = useState(() => null);

const clearEveryThing = () => {
  productTitle.value = null;
  productDescription.value = null;
  productPrice.value = null;
  productCategory.value = null;
  imageUrl.value = null;
  imageUploadSuccessMsg.value = null;
  imageUploadErrorMsg.value = null;
  productCreationErrorMsg.value = null;
  productCreationSuccessMsg.value = null;
};

const handleFileChange = (event) => {
  productImage.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!productImage.value) {
    if (import.meta.client) {
      alert('Please select an image to upload');
    }
    return;
  }

  const image = productImage.value;
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`public/${image.name}`, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (data) {
      imageUploadSuccessMsg.value = 'Image Uploaded';
      const { data } = await supabase.storage
        .from('images')
        .getPublicUrl(`public/${image.name}`);
      imageUrl.value = data.publicUrl;
    }
  } catch (err) {
    imageUploadErrorMsg.value = err.message;
  }
};

const createProduct = async () => {
  const { data: product, error } = await useFetch<Product>(
    '/api/products/create-new-product',
    {
      query: {
        title: productTitle,
        description: productDescription,
        image: imageUrl,
        category: productCategory,
        price: productPrice
      }
    }
  );

  if (error.value) {
    productCreationErrorMsg.value = 'An error happened, try again...';
    return;
  }

  productCreationSuccessMsg.value =
    'Product created successfully, Redirecting...';
  const productID = product.value.id;
  setTimeout(async () => {
    // await navigateTo(`/product-${productID}`);
  }, 2000);
};
