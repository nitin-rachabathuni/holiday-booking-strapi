const Alert = (typeOfAlert, alert) => {
  document.querySelector('.alert').innerHTML = `
    <div role='alert'>
        <span>${typeOfAlert}</span> ${alert}
        </div>
    `;
};

export default Alert;
