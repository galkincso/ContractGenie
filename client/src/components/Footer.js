import React from 'react';

const Footer = () => {

    return (
        <>
            <div class="container mt-auto pt-5">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p> ContractGenie </p>
                    <ul class="nav col-md-4 justify-content-end">
                        <li class="nav-item">
                            <a href='/create' class="nav-link active px-2 text-muted">
                                Elkészítem a saját szerződésem
                            </a>
                        </li>
                    </ul>
                </footer >
            </div >
        </>
    )
};
export default Footer;