import postPhoto from "../../services/post_photo";
import React from 'react';
import { history } from "../../history";
import getPhoto from "../../services/get_photo";
import './home_page.css';
import ReactPaginate from 'react-paginate';
import deletePhoto from "../../services/delete_photo";
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0,
            listOfImage: "",
        };
    }
    componentDidMount() {
        this.receivedData();
    }

    receivedData = () => {
        getPhoto().then((data) => {
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map((pd, index) => <React.Fragment>
                <div key={index} className="myContainer">
                    <h3 style={{ width: '300px' }}>{pd.title}</h3>
                    <p style={{ width: '300px' }}>{pd.description}</p>
                    <button onClick={() => deletePhoto(pd._id).then(() => this.receivedData())}>delete</button>
                    <button onClick={() => history.push('/photo', pd)}>Click to Update</button>
                    <img style={{ width: '300px', height: '300px' }} src={"http://localhost:8080" + pd.image} alt="" />
                </div>
            </React.Fragment>)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                postData
            })
        });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };
    render() {
        const uploadImage = (image) => {
            let data = new FormData()
            data.append("title", "this is title-react")
            data.append("description", "this is description-react")
            data.append("image", image, image.name)
            postPhoto(data);

        }
        return (
            <div>
                <div>
                    <h4>Not1: Frontend kısmında react kullandığım için ejs'de verilen bootsrap style'larını kullanamadım o yüzden görünüş biraz göz kanatabilir ama backend kısmında yapılan tüm işlemler tamamlandı.</h4>
                    <h4>Not2: Eklenilen resimler büyük ihtimalle heroku serverinden dolayı görünmeyecek. Siz kendi resimlerinizi ekleyip test edebilirsiniz.</h4>
                    <h2>Pcat</h2>
                    <button onClick={() => history.push('addphoto')}>Go To Add Photo Screen</button>
                    <input ref={input => this.inputElement = input} type="file" name="newsImage" id="exampleFile" style={{ opacity: "inherit", position: "inherit", display: "none" }}
                        onChange={(e) => {
                            uploadImage(e.target.files[0]);
                        }}
                    />
                </div>
                <div>
                    <div>
                        {this.state.postData}
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>
            </div>
        );
    }



}
export default HomePage;



/* <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-01.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Aenean aliquet sapien</h3>
                                    <p className="tm-catalog-item-text">Video thumbnail has a link to another HTML page.
                                        Categories <span className="tm-text-secondary">do not need</span> any JS.
                                        They are just separated HTML pages. Paging is at the bottom to extend the list as long as you want.
                                        This can be a large catalog.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-02.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Mauris in odio vel odio</h3>
                                    <p className="tm-catalog-item-text">You may need TemplateMo for a quick chat or send an email if you have any question about this CSS template.
                                        <span className="tm-text-secondary">font-family: 'Source Sans Pro', sans-serif; for this template.</span></p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-03.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Sagittis sodales enim</h3>
                                    <p className="tm-catalog-item-text">You are allowed to use this video catalog for your business websites.
                                        Please do not make a re-distribution of our template ZIP file on any template collection website.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-04.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Nam tincidunt consectetur</h3>
                                    <p className="tm-catalog-item-text">You can apply this template for your commercial CMS theme. Nam sem leo, imperdiet non lacinia eget, volutpat ac massa. Donec mattis in velit quis commodo. Cras nec rutrum arcu.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-05.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Praesent posuere rhoncus</h3>
                                    <p className="tm-catalog-item-text">Duis vulputate nisl metus, eget dapibus nunc ultricies id. Ut augue mauris, varius quis nulla non, sollicitudin consectetur nisl. Donec eget arcu placerat, ullamcorper.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-06.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Turpis massa aliquam</h3>
                                    <p className="tm-catalog-item-text">Nunc neque risus, ultrices sed luctus at, iaculis at arcu. Pellentesque rutrum velit nec sapien ullamcorper ultrices. Vestibulum lectus risus, laoreet pretium ipsum</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-07.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">className aptent taciti sociosqu</h3>
                                    <p className="tm-catalog-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum orci sit amet dignissim rhoncus. Pellentesque pretium faucibus vestibulum.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-08.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Donec ac nisl ul elit</h3>
                                    <p className="tm-catalog-item-text">Suspendisse in odio congue, lobortis metus sed, venenatis nisl. In dapibus et massa feugiat facilisis. Maecenas venenatis aliquet nulla, a tincidunt erat suscipit eget.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img src="img/tn-09.jpg" alt="Image" className="img-fluid tm-catalog-item-img" />
                                    <a href="video-page.html" className="position-absolute tm-img-overlay">
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">Sed mattis nisi erat</h3>
                                    <p className="tm-catalog-item-text">Integer ultricies mi eu aliquet cursus. Nam sem leo, imperdiet non lacinia eget, volutpat ac massa. Donec mattis in velit quis commodo. Cras nec rutrum arcu.</p>
                                </div> */