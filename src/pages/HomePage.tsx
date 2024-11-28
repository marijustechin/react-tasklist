import { useState } from 'react';
import { Modal } from '../components/Modal';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [yes, setYes] = useState(false);

  const handleQuestion = () => {
    setConfirm(true);
    setOpen(true);
  };

  const handleInfo = () => {
    setConfirm(false);
    setOpen(true);
  };

  console.log(yes);

  return (
    <main className="text-center">
      <h1 className="text-3xl">Tuščias projektas</h1>
      <button onClick={handleQuestion} className="btn-red">
        Raudonas
      </button>
      <button className="btn-red-disabled">Raudoans</button>
      <button onClick={handleInfo} className="btn-green">
        Raudoans
      </button>
      <button className="btn-green-disabled">Raudoans</button>

      {/* show modal window */}
      {confirm ? (
        <Modal
          onNo={() => setYes(false)}
          onYes={() => setYes(true)}
          onClose={() => setOpen(false)}
          open={open}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          aliquid animi non, magnam, ad reprehenderit error repellendus cumque
          ut perferendis sequi dolorem nesciunt? Voluptates inventore, eius
          vitae tempore rem soluta.
        </Modal>
      ) : (
        <Modal onClose={() => setOpen(false)} open={open}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          aliquid animi non, magnam, ad reprehenderit error repellendus cumque
          ut perferendis sequi dolorem nesciunt? Voluptates inventore, eius
          vitae tempore rem soluta.
        </Modal>
      )}
    </main>
  );
};

export default HomePage;
