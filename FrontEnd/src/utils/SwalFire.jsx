import Swal from "sweetalert2";

const swalFire = (text1) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: text1,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  };
  
  export default swalFire;