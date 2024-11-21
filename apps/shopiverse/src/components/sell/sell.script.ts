import { Product } from '../../utils/product.interface';
import { v4 as uuidv4 } from 'uuid';

export function useSellLogic() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const productTitle = useState<string | null>(() => null);
  const productDescription = useState<string | null>(() => null);
  const productPrice = useState<number | null>(() => null);
  const productCategory = useState<string | null>(() => null);
  const productImage = useState<File | null>(() => null);
  const imageUrl = useState<string | null>(() => null);
  const imageUploadSuccessMsg = useState<string | null>(() => null);
  const imageUploadErrorMsg = useState<string | null>(() => null);
  const productCreationSuccessMsg = useState<string | null>(() => null);
  const productCreationErrorMsg = useState<string | null>(() => null);

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

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    productImage.value = target.files?.[0];
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
      const { data } = await supabase.storage
        .from('images')
        .upload(`public/${image.name}`, image, {
          cacheControl: '3600',
          upsert: false,
          contentType: image.type
        });

      if (data) {
        imageUploadSuccessMsg.value = 'Image Uploaded';
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(`public/${image.name}`);
        imageUrl.value = data.publicUrl;
      }
    } catch (err) {
      imageUploadErrorMsg.value = err.message;
    }
  };

  const createProduct = async () => {
    try {
      const newProduct: Product = {
        id: uuidv4(),
        user_id: user.id as string,
        title: productTitle.value,
        description: productDescription.value,
        image: imageUrl.value,
        category: productCategory.value,
        price: Number(productPrice.value),
        quantity: 1
      };

      const res = await $fetch<{
        data: Product;
      }>('/api/products/create-new-product', {
        method: 'POST',
        body: JSON.stringify(newProduct)
      });

      productCreationSuccessMsg.value =
        'Product created successfully, Redirecting...';
      const productID = res.data.id;
      setTimeout(async () => {
        await navigateTo(`/products/${productID}`);
      }, 2000);
    } catch (error) {
      productCreationErrorMsg.value = `Error creating product: ${error.message}`;
    }
  };

  onMounted(() => {
    if (!user) {
      navigateTo('/login');
    }
  });

  return {
    productTitle,
    productDescription,
    productPrice,
    productCategory,
    productImage,
    imageUrl,
    imageUploadSuccessMsg,
    imageUploadErrorMsg,
    productCreationSuccessMsg,
    productCreationErrorMsg,
    clearEveryThing,
    handleFileChange,
    uploadImage,
    createProduct
  };
}
