import React, {Component} from 'react'
import Header from '../../../shared/Header/Header'
import SiteDrower from '../../../shared/SiteDrower/SiteDrower'
import Footer from '../../../shared/Footer/Footer'


class SiteLayout extends Component {
    state = {
        isDrawerOpen: false
    }

    toggleDrawer = value => {
        this.setState({
            isDrawerOpen: value
        })
    }


    render() {
        return (
            <div>
                <Header
                    onLeftIconClicked={() => this.setState({isDrawerOpen: true})}
                />
                <SiteDrower
                    open={this.state.isDrawerOpen}
                    onClose={value => this.toggleDrawer(value)}
                />
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        )
    }
}

export default SiteLayout