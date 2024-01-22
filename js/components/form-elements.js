export function formElements(){
  const formData = {
    input: document.querySelector('#text_input'),
    option: document.querySelector('#select_text'),
    inputValue: document.querySelector('#text_input').value,
    optionValue: document.querySelector('#select_text').value,
    formData: document.querySelectorAll('.form-panel input, .form-panel select, .form-panel button, .form-panel textarea')
  }
  return formData;
}