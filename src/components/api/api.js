
const apiKey = '39358153-a46635e1a9ac8a2573ff17e3b';

export async function loadImages(query, page) {
  const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    return {
      images: data.hits,
      totalImagesCount: data.totalHits,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
