import { useForm } from 'react-hook-form';

const UploadFile = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    fetch('http://localhost:8000/api/files/upload', {
      method: 'POST',
      body: data,
    })
      .then((results) => results.json())
      .then(console.log);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('picture')} type="file" />
      <button>Submit</button>
    </form>
  );
};

export default UploadFile;
