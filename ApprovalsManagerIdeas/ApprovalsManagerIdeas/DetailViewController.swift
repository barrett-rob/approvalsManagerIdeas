//
//  DetailViewController.swift
//  ApprovalsManagerIdeas
//
//  Created by Rob Barrett on 11/09/2014.
//  Copyright (c) 2014 Ventyx. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    @IBOutlet weak var itemType: UILabel!
    @IBOutlet weak var itemId: UILabel!
    @IBOutlet weak var itemDescription: UILabel!

    var detailItem: AnyObject? {
        didSet {
            // Update the view.
            self.configureView()
        }
    }

    func configureView() {
        // Update the user interface for the detail item.
        if let detail: AnyObject = self.detailItem {
            self.itemType?.text = detail.valueForKey("itemType").description
            self.itemId?.text = detail.valueForKey("itemId").description
            self.itemDescription?.text = detail.valueForKey("itemDescription").description
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.configureView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

