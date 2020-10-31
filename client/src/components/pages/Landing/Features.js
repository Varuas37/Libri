import React from "react";

const feature1 = require("../../../assets/img/features-1.svg");
const feature2 = require("../../../assets/img/features-2.svg");
const feature3 = require("../../../assets/img/features-4.svg");
const feature4 = require("../../../assets/img/features-3.svg");

export default function Features() {
  return (
    <div>
      <section
        id="features"
        class="features section-bg"
        style={{ background: "#F2F6FA", padding: "20px" }}
      >
        <div class="container">
          <div class="section-title">
            {/* <h2>Features</h2> */}
            {/* <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p> */}
          </div>

          <div class="row content">
            <div class="col-md-5" data-aos="fade-right">
              <img src={feature1} class="img-fluid" alt="" />
            </div>
            <div class="col-md-7 pt-4" data-aos="fade-left">
              <h3>Buy and Sell Used Products</h3>
              <p class="font-italic">
                Buy and Sell your used Text Books and other Items. Exclusively
                to the students within your school
              </p>
              <ul>
                <li>
                  <i class="icofont-check"></i> List your items and Books for
                  Free
                </li>
                <li>
                  <i class="icofont-check"></i> You can also sell your notes for
                  specific classes
                </li>
              </ul>
            </div>
          </div>

          <div class="row content">
            <div class="col-md-5 order-1 order-md-2" data-aos="fade-left">
              <img src={feature2} class="img-fluid" alt="" />
            </div>
            <div class="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
              <h3> Connect with students in your university.</h3>
              <p class="font-italic">
                Connect with friends and raise issues about your university.
              </p>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </p>
            </div>
          </div>

          <div class="row content">
            <div class="col-md-5" data-aos="fade-right">
              <img src={feature3} class="img-fluid" alt="" />
            </div>
            <div class="col-md-7 pt-5" data-aos="fade-left">
              <h3>Find Events near you</h3>
              <p>
                Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus
                quia minima quod. Sunt saepe odit aut quia voluptatem hic
                voluptas dolor doloremque.
              </p>
              <ul>
                <li>
                  <i class="icofont-check"></i> Ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </li>
              </ul>
            </div>
          </div>

          <div class="row content">
            <div class="col-md-5 order-1 order-md-2" data-aos="fade-left">
              <img src={feature4} class="img-fluid" alt="" />
            </div>
            <div class="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
              <h3>Create and Join Groups</h3>
              <p class="font-italic">
                Got stuck in that question? Ask help from your friends
              </p>
              <p>
                Students can create and join groups they are interested in. Once
                you add your classes you are automatically enrolled in that
                group class. Make more groups and find students with similar
                interests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
