import throttle from 'lodash.throttle';
import storage from './storage';

const FORM_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('form.feedback-form'),
};

populateForm();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  const { name, value } = e.target;
  const formData = getSavedForm();
  formData[name] = value;
  storage.save(FORM_STORAGE_KEY, formData);
}

function onFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = {};

  new FormData(form).forEach((value, name) => {
    formData[name] = value;
  });

  console.log(formData);

  form.reset();
  storage.remove(FORM_STORAGE_KEY);
}

function populateForm() {
  const formData = getSavedForm();

  Object.entries(formData).forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
}

function getSavedForm() {
  return storage.load(FORM_STORAGE_KEY) || {};
}
