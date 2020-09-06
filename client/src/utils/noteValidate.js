import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Please enter the title!'),
  content: yup.string().required('Please enter the content!'),
});

const noteValidate = (value) => schema.validate(value, { abortEarly: false });

export default noteValidate;
