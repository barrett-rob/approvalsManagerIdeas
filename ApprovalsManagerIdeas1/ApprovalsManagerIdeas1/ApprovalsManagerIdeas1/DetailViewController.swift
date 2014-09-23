//
//  DetailViewController.swift
//  ApprovalsManagerIdeas1
//
//  Created by Rob Barrett on 22/09/2014.
//  Copyright (c) 2014 Ventyx. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    var data: AMData!
    @IBOutlet weak var detailDescriptionLabel: UILabel!

    var detailItem: AnyObject? {
        didSet {
            self.configureView()
        }
    }

    func configureView() {
        if let detail: AnyObject = self.detailItem {
            if let label = self.detailDescriptionLabel {
                label.text = detail.description
            }
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.configureView()
    }

}

