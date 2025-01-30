import React, {useState} from 'react';
import Popup from '../styles/Popup';

const usePopupForm = (Form) => {
  const [activeItem, setActiveItem] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

    const PopupForm = (props) => (
        <>
            {activeItem && (
                <Popup onClose={() => setActiveItem(null)}>
                    <Form initObj={activeItem} {...props}/>
                </Popup>
            )}
            {showNewForm && (
                <Popup onClose={() => setShowNewForm(false)}>
                    <Form  {...props}/>
                </Popup>
            )}
      </>
    );

    return {PopupForm, setActiveItem, setShowNewForm};
}

export default usePopupForm;
