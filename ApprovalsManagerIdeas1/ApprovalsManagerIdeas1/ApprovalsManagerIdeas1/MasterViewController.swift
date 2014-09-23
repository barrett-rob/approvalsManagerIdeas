//
//  MasterViewController.swift
//  ApprovalsManagerIdeas1
//
//  Created by Rob Barrett on 22/09/2014.
//  Copyright (c) 2014 Ventyx. All rights reserved.
//

import UIKit

class MasterViewController: UITableViewController {

    var detailViewController: DetailViewController! = nil
    var data: AMData! = nil

    override func awakeFromNib() {
        super.awakeFromNib()
        if UIDevice.currentDevice().userInterfaceIdiom == .Pad {
            self.clearsSelectionOnViewWillAppear = false
            self.preferredContentSize = CGSize(width: 320.0, height: 600.0)
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let controllers = self.splitViewController!.viewControllers
        let detailNavigationController = controllers[1] as UINavigationController
        self.detailViewController = detailNavigationController.topViewController as DetailViewController
        if self.data == nil {
            self.data = AMData() // inits some data
            // set a reference to the data
            self.detailViewController!.data = self.data
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Segues

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showDetail" {
            if let indexPath = self.tableView.indexPathForSelectedRow() {
                let controller = (segue.destinationViewController as UINavigationController).topViewController as DetailViewController
                controller.data = self.data
                controller.itemType = getItemType(indexPath.row)
                controller.navigationItem.leftBarButtonItem = self.splitViewController?.displayModeButtonItem()
                controller.navigationItem.leftItemsSupplementBackButton = true
            }
        }
    }

    // MARK: - Table View

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data.getItemTypes().count
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("itemTypeCell", forIndexPath: indexPath) as UITableViewCell
        let itemTypes = data.getItemTypes()
        if let itemType = getItemType(indexPath.row)? {
            let n = itemTypes[itemType]!
            cell.textLabel?.text = itemType
            cell.detailTextLabel?.text = "\(n.description)"
        }
        return cell
    }

    func getItemType(row: Int) -> String? {
        let itemTypes = data.getItemTypes()
        let keys = Array(itemTypes.keys)
        if keys.count > row {
            let key = keys[row]
            return key
        }
        return nil
    }
}

