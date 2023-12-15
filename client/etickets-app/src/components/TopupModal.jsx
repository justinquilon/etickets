import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { toast } from 'react-toastify';

function TopupModal(props) {
    const { onHide } = props
    const {
        userId,
        setUserId,
        accountId,
        setAccountId,
        isAdmin,
        setIsAdmin,
        eventArray,
        setEventArray,
        load,
        setLoad,
      } = useContext(UserContext);
    const [addLoad, setAddLoad] = useState(0);
    const addLoadHandler = async(e) => {
        e.preventDefault();
        try {
            const loadApi = await fetch('http://localhost:8080/api/v1/accounts/load', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                id: accountId,
                addLoad: addLoad
                })
            });
            const response = await loadApi.json();
            if (response.message ==='success') {
                const newLoad = load + addLoad;
                setLoad(newLoad);
                toast.success(`Successfully topped up ${addLoad}`)
                onHide();
            } else {
                toast.error('Failed transaction')
            }
        } catch (error) {
            console.error('Error deleting an item:', error.message);
        }
   };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Topup Load
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
      <Form>
      <Form.Group className="mb-3" controlId="formTopup">
        <Form.Label>Topup Amount</Form.Label>
        <Form.Control type="text" value={addLoad} onChange={(e)=>setAddLoad(e.target.value)}/>
        <Form.Text className="text-muted">
            We accept payment from across all major banks and credit card
        </Form.Text>
      </Form.Group>
      <Image src="payment.png" style={{width:'300px', height:'100px'}} />

      <Form.Group className="mb-3" controlId="formTopup">
      <Button variant="primary" type="submit" onClick={addLoadHandler}>Submit</Button>
      <Button onClick={props.onHide} style={{marginLeft:'10px'}}>Close</Button>
     </Form.Group>
    </Form>
      </Modal.Body>

    </Modal>
  );
}

export default TopupModal