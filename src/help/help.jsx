import React from 'react';
import './help.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export function Help() {
    return(
        <main className="container">
            <h1>Help</h1> 
            <div id="faq" className="accordion">
                <div className="accordion-item">
                    <div className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" href="#whatis">
                            What is BYU Parkit?
                        </button>
                    </div>
                    <div id="whatis" className="accordion-collapse collapse show" data-bs-parent="#faq">
                        <div className="accordion-body">
                            BYU Parkit is an open-source, project that aims to streamline the process
                            of parking at BYU. Students, teachers, and guests can use the app to find 
                            available parking spots, then record how full the lot is to help other visitors.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" href="#howdoes">
                            How do I use BYU Parkit?
                        </button>
                    </div>
                    <div id="howdoes" className="accordion-collapse collapse" data-bs-parent="#faq">
                        <div className="accordion-body">
                            Right now, the website isn't functional. But don't worry!
                            It should be fully up and running before December 5th.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" href="#whatdo">
                            What do I do if I notice a bug?
                        </button>
                    </div>
                    <div id="whatdo" className="accordion-collapse collapse" data-bs-parent="#faq">
                        <div className="accordion-body">
                            For now, nothing. Once the site is fully up, you can submit
                            a ticket on Github and I'll try to adress it as soon as possible.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" href="#howdo">
                            This site is great! How do I support this?
                        </button>
                    </div>
                    <div id="howdo" className="accordion-collapse collapse" data-bs-parent="#faq">
                        <div className="accordion-body">
                            The most important thing you can do is make sure you use the 
                            app when it comes out! Because all the data will be 
                            crowdsourced, it's really important that we get a large user
                            base. Share it with your friends!
                        </div>
                        <div className="accordion-body">
                            Right now, this is a class assignment, so there isn't really much
                            that can be done. Once the site is up and running, I'll be maintaining it
                            on my own and for free, so I might put together a dev team or accept
                            donations. If you're interested in that (and I decide to do it), I'll
                            put some sort of contact info here and you can reach out to me.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}