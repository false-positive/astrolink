import { useForm } from 'react-hook-form';

const UploadFile = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // send file data to http://127.0.0.1:8000/api/files/ with a post request

    console.log(data);

    const formdata = new FormData();
    formdata.append('name', 'test9');
    formdata.append('project', '1');
    // formdata.append('file', data.files[0], data.files[0].name);
    formdata.append('file', data.file[0], data.file[0].name);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://localhost:8000/api/files/', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('file')} type="file" />
      <button>Submit</button>
    </form>
  );
};

export default UploadFile;
