import throttle from 'lodash.throttle';
import storage from './storage';

const STORAGE_KEY = 'feedback-form-state';
const savedFormData = storage.load(STORAGE_KEY) || {};
const refs = {
  form: document.querySelector('form.feedback-form'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateForm();

function populateForm() {
  Object.entries(savedFormData).forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
}

function onFormInput({ target: { name, value } }) {
  savedFormData[name] = value;
  storage.save(STORAGE_KEY, savedFormData);
}

function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const data = {};

  new FormData(form).forEach((value, name) => {
    data[name] = value;
  });

  console.log(data);
  storage.remove(STORAGE_KEY);
  form.reset();
}
