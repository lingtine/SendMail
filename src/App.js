import styles from './App.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function App() {
    const [subjectValue, setSubjectValue] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [attachments, setAttachments] = useState();
    const [recipients, setRecipients] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrol, setIsErrol] = useState(false);
    const [message, setMessage] = useState('');
    const mailApi = 'http://localhost:8080/api/v1/emails';
    const userApi = 'http://localhost:3333/userMails';

    useEffect(() => {
        fetch(userApi)
            .then((response) => response.json())
            .then((data) => setDataUsers(data));
    }, []);

    useEffect(() => {}, [message]);

    // const handleErrol = () => {
    //     if(subjectValue.trim() == ' ')
    // };

    const handleSendMail = () => {
        // handleErrol();
        let formData = new FormData(); //formdata object

        formData.append('recipients', recipients);
        formData.append('subject', subjectValue);
        formData.append('content', contentValue);
        if (attachments !== undefined)
            //append the values with key, value pair
            formData.append('attachments', attachments[0]);

        setIsLoading(true);
        console.time('Time send mail: ');
        fetch(mailApi, {
            method: 'POST',
            mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
                console.timeEnd('Time send mail: ');
            });
    };
    const handleRemoveAll = () => {
        setRecipients([]);
    };

    const handleSelectedNumber = (numberSelected) => {
        handleRemoveAll();
        let newArray = [];

        for (let i = 0; i < numberSelected; i++) {
            newArray.push(dataUsers[i].mail);
        }
        setRecipients([...newArray]);
        console.log(recipients);
    };

    const handleSelectAll = () => {
        setRecipients(dataUsers.map((user) => user.mail));
        console.log(recipients);
    };

    const handleClick = (e) => {
        const { name, checked } = e.target;
        console.log(name, checked);
        if (!checked) {
            setRecipients(recipients.filter((item) => item !== name));
            console.log(recipients.filter((item) => item !== name));
        } else {
            setRecipients((oldArray) => [...oldArray, e.target.name]);
        }
    };
    return (
        <div className={cx('app')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-5', 'container')}>
                        <h2 className={cx('heading')}>Send Bulk Mails</h2>
                        <div className={cx('content-inputs')}>
                            <div className={cx('content-input-item subject')}>
                                <label className={cx('label-input')}>
                                    Subject:{' '}
                                </label>
                                <div className={cx('wrapper-input')}>
                                    <input
                                        type="text"
                                        placeholder="Subject:"
                                        onChange={(e) => {
                                            setSubjectValue(e.target.value);
                                        }}
                                        className={cx('subject-input')}
                                    />
                                </div>
                            </div>
                            <div className={cx('content-input-item content')}>
                                <label className={cx('label-input')}>
                                    Content:{' '}
                                </label>
                                <div className={cx('wrapper-textarea')}>
                                    <textarea
                                        placeholder="Context"
                                        cols={30}
                                        rows={12}
                                        className={cx('content-input')}
                                        name=""
                                        id=""
                                        onChange={(e) => {
                                            setContentValue(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            <div
                                className={cx('content-input-item attachments')}
                            >
                                <label className={cx('label-input')}>
                                    Attachments:{' '}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setAttachments(e.target.files);
                                    }}
                                    className={cx('attachments-input')}
                                />
                            </div>
                            <div>
                                <p className={cx('status', { errol: isErrol })}>
                                    {message}
                                </p>
                            </div>
                            <div className={cx('content-btn')}>
                                <button
                                    className={cx('btn-send-mail', 'btn')}
                                    type="submit"
                                    onClick={() => {
                                        handleSendMail();
                                    }}
                                >
                                    Send mail
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('l-o-2')}></div>
                    <div className={cx('col', 'l-5', 'data-content')}>
                        <div className={cx('data-content-controller')}>
                            <button
                                className={cx('btn-select-all', 'btn')}
                                onClick={() => {
                                    handleSelectedNumber(10);
                                }}
                            >
                                Select 10
                            </button>
                            <button
                                className={cx('btn-select-all', 'btn')}
                                onClick={() => {
                                    handleSelectedNumber(50);
                                    console.log(1);
                                }}
                            >
                                Select 50
                            </button>
                            <button
                                className={cx('btn-select-all', 'btn')}
                                onClick={() => {
                                    handleSelectedNumber(100);
                                }}
                            >
                                Select 100
                            </button>
                            <button
                                className={cx('btn-select-all', 'btn')}
                                onClick={() => {
                                    handleSelectedNumber(200);
                                }}
                            >
                                Select 200
                            </button>
                            <button
                                className={cx('btn-select-all', 'btn')}
                                onClick={handleSelectAll}
                            >
                                Select All
                            </button>
                            <button
                                className={cx('btn-select-all', 'btn')}
                                onClick={handleRemoveAll}
                            >
                                Delete All Select
                            </button>
                        </div>
                        <div className={cx('data-table')}>
                            <div className={cx('table')}>
                                <div className={cx('heading-table')}>
                                    <div>No.</div>
                                    <div>NAME</div>
                                    <div>Mail</div>
                                    <div>Checked</div>
                                </div>
                                <div className={cx('container-items-table')}>
                                    {dataUsers.map((dataUser, index) => (
                                        <div
                                            key={index}
                                            className={cx('item-table')}
                                        >
                                            <div className={cx('serial')}>
                                                {index + 1}
                                            </div>
                                            <div className={cx('user-name')}>
                                                {dataUser.name}
                                            </div>
                                            <div className={cx('user-email')}>
                                                {dataUser.mail}
                                            </div>
                                            <div className={cx('user-checked')}>
                                                <input
                                                    onClick={handleClick}
                                                    onChange={() => {}}
                                                    type="checkbox"
                                                    name={dataUser.mail}
                                                    id={index}
                                                    checked={recipients.includes(
                                                        dataUser.mail,
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className={cx('modal')}>
                    <div className={cx('loading')}>
                        <FontAwesomeIcon
                            className={cx('icon-loading')}
                            icon={faSpinner}
                        ></FontAwesomeIcon>
                        <div>LOADING . . .</div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default App;
