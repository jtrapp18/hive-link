import React, {useState} from 'react';
import Popup from '../styles/Popup';

const usePopupForm = (Form) => {
  const [activeItem, setActiveItem] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

    const PopupForm = (props) => (
        <>
            {activeItem && (
                <Popup onClose={() => setActiveItem(null)}>
                    <Form 
                        initObj={activeItem}
                        deleted={showDeleted}
                        {...props}
                    />
                </Popup>
            )}
            {showNewForm && (
                <Popup onClose={() => setShowNewForm(false)}>
                    <Form  {...props}/>
                </Popup>
            )}
      </>
    );

    return {PopupForm, setActiveItem, setShowNewForm, setShowDeleted};
}

export default usePopupForm;
